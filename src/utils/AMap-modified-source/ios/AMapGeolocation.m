#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import <React/RCTEventEmitter.h>
#import "DHJLocationUtils.h"

@interface AMapGeolocation
: RCTEventEmitter <RCTBridgeModule, AMapLocationManagerDelegate>

@property (nonatomic, strong) AMapLocationManager *manager;

@property (nonatomic, strong) AMapLocationManager *managerForOnce;
@end

@implementation AMapGeolocation {
  AMapLocationManager *_manager;
  AMapLocationManager *_managerForOnce;
}


RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(init, initWithKey
                 : (NSString *)key
                 : (RCTPromiseResolveBlock)resolve
                 : (RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [AMapServices sharedServices].apiKey = key;
    if (!(self->_manager)) {
      self->_manager = [[AMapLocationManager alloc] init];
      self->_manager.delegate = self;
    }
    
    if (!(self->_managerForOnce)) {
      self->_managerForOnce = [[AMapLocationManager alloc] init];
      self->_managerForOnce.delegate = self;
    }
    resolve(nil);
  });
}

RCT_EXPORT_METHOD(start) { [_manager startUpdatingLocation]; }

RCT_EXPORT_METHOD(stop) { [_manager stopUpdatingLocation]; }

RCT_EXPORT_METHOD(setLocatingWithReGeocode : (BOOL)value) {
  _manager.locatingWithReGeocode = value;
  _managerForOnce.locatingWithReGeocode = value;
}

RCT_EXPORT_METHOD(setAllowsBackgroundLocationUpdates : (BOOL)value) {
  _manager.allowsBackgroundLocationUpdates = value;
  _managerForOnce.allowsBackgroundLocationUpdates = value;
}

RCT_EXPORT_METHOD(setPausesLocationUpdatesAutomatically : (BOOL)value) {
  _manager.pausesLocationUpdatesAutomatically = value;
  _managerForOnce.pausesLocationUpdatesAutomatically = value;
}

RCT_EXPORT_METHOD(setDesiredAccuracy : (int)value) {
  _manager.desiredAccuracy = value;
  _managerForOnce.desiredAccuracy = value;
}

RCT_EXPORT_METHOD(setDistanceFilter : (int)value) {
  _manager.distanceFilter = value;
  _managerForOnce.distanceFilter = value;
}

RCT_EXPORT_METHOD(setGeoLanguage : (int)value) {
  _manager.reGeocodeLanguage = (AMapLocationReGeocodeLanguage)value;
  _managerForOnce.reGeocodeLanguage = (AMapLocationReGeocodeLanguage)value;
}

RCT_EXPORT_METHOD(setReGeocodeTimeout : (int)value) {
  _manager.reGeocodeTimeout = value;
  _managerForOnce.reGeocodeTimeout = value;
}

RCT_EXPORT_METHOD(setLocationTimeout : (int)value) {
  _manager.locationTimeout = value;
  _managerForOnce.locationTimeout = value;
}

RCT_EXPORT_METHOD(getLocationOnce
                  : (NSDictionary *)options
                  : (RCTPromiseResolveBlock)resolve
                  : (RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    
    DHJLocationUtils *loca = [[DHJLocationUtils alloc] init];
    NSString *prefix = @"getLocationOnce options regeo value is: ";
    NSString *input = [prefix stringByAppendingString:[[options valueForKey:@"regeo"] stringValue]];
    [loca output:input];
    
    [self->_managerForOnce setDesiredAccuracy:kCLLocationAccuracyHundredMeters];
    
    //超时时间
    NSString *timeout = options[@"timeout"];
    if (timeout.length) {
      [self->_managerForOnce setLocationTimeout:[timeout intValue]];
    } else {
      [self->_managerForOnce setLocationTimeout: 2];
    }
    
    int needRegeo = [options[@"regeo"] intValue];
    
    [self->_managerForOnce requestLocationWithReGeocode:needRegeo
                                 completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
      if (error) {
        NSLog(@"locError:{%ld - %@};", (long)error.code, error.localizedDescription);
        
        if (error.code == AMapLocationErrorLocateFailed)
        {
          return;
        }
      }
      id json = [self json:location reGeocode:regeocode];
      if(resolve) {
        resolve(json);
      }
    }];
  });
}


- (id)json:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeocode {
  if (reGeocode) {
    return @{
      @"errorCode" : @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"heading" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
      @"address" : reGeocode.formattedAddress ? reGeocode.formattedAddress
      : @"",
      @"poiName" : reGeocode.POIName ? reGeocode.POIName : @"",
      @"country" : reGeocode.country ? reGeocode.country : @"",
      @"province" : reGeocode.province ? reGeocode.province : @"",
      @"city" : reGeocode.city ? reGeocode.city : @"",
      @"cityCode" : reGeocode.citycode ? reGeocode.citycode : @"",
      @"district" : reGeocode.district ? reGeocode.district : @"",
      @"street" : reGeocode.street ? reGeocode.street : @"",
      @"streetNumber" : reGeocode.number ? reGeocode.number : @"",
      @"adCode" : reGeocode.adcode ? reGeocode.adcode : @"",
    };
  } else {
    return @{
      @"errorCode" : @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"direction" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
    };
  }
}

- (void)amapLocationManager:(AMapLocationManager *)manager
          didUpdateLocation:(CLLocation *)location
                  reGeocode:(AMapLocationReGeocode *)reGeocode {
  id json = [self json:location reGeocode:reGeocode];
  [self sendEventWithName:@"AMapGeolocation" body:json];
}

- (void)amapLocationManager:(AMapLocationManager *)manager
           didFailWithError:(NSError *)error {
  [self sendEventWithName:@"AMapGeolocation"
                     body:@{
                       @"errorCode" : @(error.code),
                       @"errorInfo" : error.localizedDescription,
                     }];
}

- (void)amapLocationManager:(AMapLocationManager *)manager
      doRequireLocationAuth:(CLLocationManager *)locationManager {
  [locationManager requestAlwaysAuthorization];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"AMapGeolocation" ];
}

@end
