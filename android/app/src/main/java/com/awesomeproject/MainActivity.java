package com.awesomeproject;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.awesomeproject.pedometer.StepCounterService;
import com.awesomeproject.pedometer.StepCounterOldService;

import android.os.Bundle;
import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNPedometerPackage(this)
        );
    }

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        Boolean can = StepCounterOldService.deviceHasStepCounter(this.getPackageManager());
        if (!can) {
            startService(new Intent(this, StepCounterService.class));
        } else {
            startService(new Intent(this, StepCounterOldService.class));
        }


    }
}
