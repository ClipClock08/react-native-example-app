package com.awesomeproject.pedometer;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class StepCounterBootReceiver extends BroadcastReceiver{

    @Override
    public void onReceive(Context context, Intent intent) {
        Boolean can = StepCounterOldService.deviceHasStepCounter(context.getPackageManager());
        if(!can) {
            Intent stepCounterServiceIntent = new Intent(context,StepCounterService.class);
            context.startService(stepCounterServiceIntent);
        } else {
            Intent stepCounterServiceOldIntent = new Intent(context, StepCounterOldService.class);
            context.startService(stepCounterServiceOldIntent);
        }
    }
}
