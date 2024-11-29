import time, requests
from datetime import datetime

import board
import adafruit_dht

# DHT22 센서를 사용할 GPIO 핀을 지정
sensor4 = adafruit_dht.DHT22(board.D4)

LH_THRESHOLD = 30
INTERVAL_SEC = 3

class SensorData:
    def __init__(self, temp=0, humid=0):
        self.temp = temp
        self.humid = humid

def get_dht22_data():
    sensor4_temperature = sensor4.temperature
    sensor4_humidity = sensor4.humidity

    return SensorData(sensor4_temperature, sensor4_humidity)

def send_data_to_server(sensor, data):
    timestamp = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    url = "http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor" + sensor
    header = {
        "Accept": "application/json",
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SOrigin",
        'Content-Type': 'application/vnd.onem2m-res+json; ty=4'
    }
    payload = {
        "m2m:cin": {
            "con": {
                "timestamp": timestamp,
                "temperature": data.temp,
                "humidity": data.humid
            }
        }
    }

    try:
        response = requests.post(url, json=payload, headers=header)
        if response.status_code == 201:
            print("데이터 전송 성공")
        else:
            print("데이터 전송 실패:", response)
    except requests.RequestException as e:
        print("데이터 전송 오류:", e)

def main():
    print("온습도 센서 데이터 수집 프로그램을 시작합니다.")

    while True:
        start_time = time.time()

        try:
            sensor4_data = get_dht22_data()

            print(sensor4_data.temp, sensor4_data.humid)


            send_data_to_server("4", sensor4_data)

        except Exception as e:
            print("메인 루프 오류:", e)

        elapsed = time.time() - start_time
        if elapsed < INTERVAL_SEC:
            time.sleep(INTERVAL_SEC - elapsed)
        else:
            print("주의: 센서 읽기 및 처리 시간이 주기보다 깁니다.")

if __name__ == "__main__":
    main()