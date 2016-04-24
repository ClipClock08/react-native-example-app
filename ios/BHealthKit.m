//
//  BHealthKit.m
//  WalkBeyond
//
//  Created by Dmitriy on 11/4/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "BHealthKit.h"
#import "RCTConvert.h"

@implementation BHealthKit


RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  
  NSMutableDictionary *hkConstants = [NSMutableDictionary new];
  
  NSMutableDictionary *hkQuantityTypes = [NSMutableDictionary new];
  
  
  [hkQuantityTypes setValue:HKQuantityTypeIdentifierStepCount forKey:@"StepCount"];
  
  
  [hkConstants setObject:hkQuantityTypes forKey:@"Type"];
  
  return hkConstants;
}



RCT_EXPORT_METHOD(askForPermissionToReadTypes:(NSArray *)types callback:(RCTResponseSenderBlock)callback){
  
  if(!self.healthKitStore){
    self.healthKitStore = [[HKHealthStore alloc] init];
  }
  
  NSMutableSet* typesToRequest = [NSMutableSet new];
  
  for (NSString* type in types) {
    [typesToRequest addObject:[HKQuantityType quantityTypeForIdentifier:type]];
    
  }
  
  [self.healthKitStore requestAuthorizationToShareTypes:nil readTypes:typesToRequest completion:^(BOOL success, NSError *error) {
    
    if(success){
//      callback(@[[NSNull null]]);
      callback(@[[NSNull null]]);
      return;
    }
    callback(@[[error localizedDescription]]);
    
    
    
  }];
}

RCT_EXPORT_METHOD(getStepsData:(NSDate *)startDate endDate:(NSDate *)endDate cb:(RCTResponseSenderBlock)callback){
  
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  
//  NSDate *startDate = [RCTConvert NSDate:startDateString];
//  NSDate *endDate = [RCTConvert NSDate:endDateString];
  NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
  
  [dateFormatter setLocale:enUSPOSIXLocale];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
  
  HKSampleQuery *stepsQuery = [[HKSampleQuery alloc]
                               initWithSampleType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
                               predicate:predicate
                               limit:2000 sortDescriptors:nil resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
    
    if(error){
      
      callback(@[[error localizedDescription]]);
      
      return;
    }
    
    
    NSMutableArray *data = [NSMutableArray new];
    
    for (HKQuantitySample* sample in results) {
      
      
//      double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
  
      
//      NSNumber *value = [[NSNumber alloc] initWithDouble:count];
      double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
//      NSNumber *value = [[NSNumber alloc] initWithDouble:count];
      NSNumber *val = [NSNumber numberWithDouble:count];
      
      NSMutableDictionary* s = [NSMutableDictionary new];
      
      [s setValue:val forKey:@"value"];
      [s setValue:sample.sampleType.description forKey:@"data_type"];
      
      
      [s setValue:[dateFormatter stringFromDate:sample.startDate] forKey:@"start_date"];
      [s setValue:[dateFormatter stringFromDate:sample.endDate] forKey:@"end_date"];
      
      [data addObject:s];
    }
    
    callback(@[[NSNull null], data ]);
  }];
  
  [self.healthKitStore executeQuery:stepsQuery];
  
};

@end
