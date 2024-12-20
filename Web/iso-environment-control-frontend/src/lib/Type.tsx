export type DateRange = {
    from: Date;
    to: Date;
};

export type SensorData = {
    timestamp: string;
    temperature: number;
    humidity: number;
};

export type MobiusData = {
    pi : any,
    ri: any,
    ty: any,
    ct: any,
    st: any,
    rn: any,
    lt: any,
    et: any,
    cs: any,
    cr: any,
    con: SensorData,
};