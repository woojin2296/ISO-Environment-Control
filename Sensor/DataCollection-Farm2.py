import smbus2
import time

# I2C 설정
I2C_BUS = 1
ADS1115_ADDR = 0x48
ADS1115_POINTER_CONVERSION = 0x00
ADS1115_POINTER_CONFIG = 0x01

# ADS1115 설정값
ADS1115_CONFIG_OS_SINGLE = 0x8000  # 단일 변환 시작
ADS1115_CONFIG_GAIN_2_048V = 0x0200  # ±2.048V 범위
ADS1115_CONFIG_MODE_SINGLE = 0x0100  # 단일 변환 모드
ADS1115_CONFIG_DR_128SPS = 0x0080  # 128 SPS
ADS1115_CONFIG_COMP_QUE_DISABLE = 0x0003  # 비교기 비활성화

# MUX 설정 (채널 선택)
MUX_SETTINGS = {
    0: 0x4000,  # AIN0
    1: 0x5000,  # AIN1
    2: 0x6000,  # AIN2
    3: 0x7000,  # AIN3
}

def read_channel(channel):
    """ADS1115에서 특정 채널의 값을 읽는 함수"""
    if channel not in MUX_SETTINGS:
        raise ValueError("유효하지 않은 채널 번호: 0, 1, 2, 3")

    # SMBus 객체 생성
    bus = smbus2.SMBus(I2C_BUS)

    # 설정 레지스터 값 구성
    config = (
        ADS1115_CONFIG_OS_SINGLE
        | MUX_SETTINGS[channel]
        | ADS1115_CONFIG_GAIN_2_048V
        | ADS1115_CONFIG_MODE_SINGLE
        | ADS1115_CONFIG_DR_128SPS
        | ADS1115_CONFIG_COMP_QUE_DISABLE
    )

    # 설정값 전송
    config_bytes = [(config >> 8) & 0xFF, config & 0xFF]
    bus.write_i2c_block_data(ADS1115_ADDR, ADS1115_POINTER_CONFIG, config_bytes)

    # 변환 대기
    time.sleep(0.01)

    # 변환 레지스터에서 데이터 읽기
    data = bus.read_i2c_block_data(ADS1115_ADDR, ADS1115_POINTER_CONVERSION, 2)

    # 데이터 결합 및 변환
    raw_value = (data[0] << 8) | data[1]
    if raw_value > 0x7FFF:
        raw_value -= 0x10000

    # 전압 계산
    voltage = raw_value * (2.048 / 32768.0)
    return voltage

def main():
    print("ADS1115 모든 채널 값 읽기")

    try:
        while True:
            for channel in range(4):  # A0, A1, A2, A3
                voltage = read_channel(channel)
                print(f"채널 {channel}: {voltage:.4f} V")
            time.sleep(1)  # 1초 대기
    except KeyboardInterrupt:
        print("종료합니다.")

if __name__ == "__main__":
    main()