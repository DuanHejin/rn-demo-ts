//
//  DHJLocationUtils.m
//  CocoaAsyncSocket
//
//  Created by devin on 2020/8/14.
//

#import "DHJLocationUtils.h"

@implementation DHJLocationUtils
- (instancetype)init
{
  self = [super init];
  if (self) {
    _className = @"DHJLocationUtils";
    self.className = @"DHJLocationUtils-1";
  }
  return self;
}

-(NSString *)output:(NSString *)str {
  NSLog(@"----  className is %@, input str is %@", self->_className, str);
  return str;
}
@end
