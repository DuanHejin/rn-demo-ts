export class GeoUtils {

  public static pi = 3.1415926535897932384626;
  public static x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  public static a = 6378245.0;
  public static ee = 0.00669342162296594323;

  public static transformLat(x: number, y: number): number {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
      + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.pi) + 40.0 * Math.sin(y / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.pi) + 320 * Math.sin(y * this.pi / 30.0)) * 2.0 / 3.0;
    return ret;
  }

  public static transformLon(x: number, y: number): number {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
      * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.pi) + 40.0 * Math.sin(x / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.pi) + 300.0 * Math.sin(x / 30.0
      * this.pi)) * 2.0 / 3.0;
    return ret;
  }

  public static transform(lat: number, lon: number): number[] {
    if (this.outOfChina(lat, lon)) {
      return [lat, lon];
    }
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * this.pi;
    let magic = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return [mgLat, mgLon];
  }

  public static outOfChina(lat: number, lon: number): boolean {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  }
  /** 
   * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System 
   * 
   * @param lat 
   * @param lon 
   * @return 
   */
  public static gps84_To_Gcj02(lat: number, lon: number): number[] {
    if (this.outOfChina(lat, lon)) {
      return [lat, lon];
    }
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * this.pi;
    let magic = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return [mgLat, mgLon];
  }

  /** 
   * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return 
   * */
  public static gcj02_To_Gps84(lat: number, lon: number): number[] {
    let gps = this.transform(lat, lon);
    let lontitude = lon * 2 - gps[1];
    let latitude = lat * 2 - gps[0];
    return [latitude, lontitude];
  }
  /** 
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标 
   * 
   * @param lat 
   * @param lon 
   */
  public static gcj02_To_Bd09(lat: number, lon: number) {
    let x = lon, y = lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    let theta = this.a = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    let tempLon = z * Math.cos(theta) + 0.0065;
    let tempLat = z * Math.sin(theta) + 0.006;
    let gps = [tempLat, tempLon];
    return gps;
  }

  /** 
   * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param 
   * bd_lat * @param bd_lon * @return 
   */
  public static bd09_To_Gcj02(lat: number, lon: number) {
    let x = lon - 0.0065, y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    let theta = this.a = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    let tempLon = z * Math.cos(theta);
    let tempLat = z * Math.sin(theta);
    const gps = [tempLat, tempLon];
    return gps;
  }

  /**将gps84转为bd09 
   * @param lat 
   * @param lon 
   * @return 
   */
  public static gps84_To_bd09(lat: number, lon: number) {
    let gcj02 = this.gps84_To_Gcj02(lat, lon);
    let bd09 = this.gcj02_To_Bd09(gcj02[0], gcj02[1]);
    return bd09;
  }
  public static bd09_To_gps84(lat: number, lon: number) {
    let gcj02 = this.bd09_To_Gcj02(lat, lon);
    let gps84 = this.gcj02_To_Gps84(gcj02[0], gcj02[1]);
    //保留小数点后六位  
    gps84[0] = this.retain6(gps84[0]);
    gps84[1] = this.retain6(gps84[1]);
    return gps84;
  }

  /**保留小数点后六位 
   * @param num 
   * @return 
   */
  private static retain6(num: number) {
    return Number(num.toFixed(6));
  }
}