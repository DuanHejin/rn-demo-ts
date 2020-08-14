//
//  DHJLocationUtils.h
//  CocoaAsyncSocket
//
//  Created by devin on 2020/8/14.
//

#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DHJLocationUtils : NSObject

@property(nonatomic, strong) NSString *className;
@property (nonatomic, strong) AMapLocationManager *manager;

- (NSString *) output: (NSString *) str;
@end

NS_ASSUME_NONNULL_END
