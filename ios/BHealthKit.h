//
//  BHealthKit.h
//  WalkBeyond
//
//  Created by Dmitriy on 11/4/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#ifndef BHealthKit_h
#define BHealthKit_h

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@import HealthKit;

@interface BHealthKit : NSObject <RCTBridgeModule>

@property (nonatomic) HKHealthStore* healthKitStore;

@end


#endif /* BHealthKit_h */
