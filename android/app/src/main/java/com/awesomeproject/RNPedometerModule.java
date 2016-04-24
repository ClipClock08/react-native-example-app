package com.awesomeproject;

import android.app.Activity;
import android.content.SharedPreferences;
import android.util.Log;
import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNPedometerModule extends ReactContextBaseJavaModule {

    private Activity mActivity = null;
    private ReactApplicationContext mContext;

    private final String TAG = "RNPedometerModule";

    public RNPedometerModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        this.mContext = reactContext;
        this.mActivity = activity;
    }

    @Override
    public String getName() {
        return "PedometerAndroid";
    }

    @ReactMethod
    public void getDaySteps(Callback successCallback, Callback errorCallback) {
        SharedPreferences sharedPref = mActivity.getSharedPreferences("UserData", Context.MODE_PRIVATE);
        if(sharedPref.contains("pedometerData")){
            String pDataString = sharedPref.getString("pedometerData", "{}");

            Date currentDate = new Date();
            SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
            String currentDateString = dateFormatter.format(currentDate);

            JSONObject pData = new JSONObject();
            JSONObject dayData = new JSONObject();
            Integer daySteps = -1;
            try{
                pData = new JSONObject(pDataString);
                Log.d(TAG," got json shared prefs "+pData.toString());
            }catch (JSONException err){
                Log.d(TAG," Exception while parsing json string : "+pDataString);
                errorCallback.invoke(err.getMessage());
            }

            if (pData.has(currentDateString)) {
                try {
                    dayData = pData.getJSONObject(currentDateString);
                    successCallback.invoke(dayData.toString());
                } catch(JSONException err) {
                    Log.e(TAG,"Exception while getting Object from JSON for "+currentDateString);
                    errorCallback.invoke(err.getMessage());
                }
            }
        }
    }

    @ReactMethod
    public void getHistory(Callback successCallback, Callback errorCallback) {
        SharedPreferences sharedPref = mActivity.getSharedPreferences("UserData", Context.MODE_PRIVATE);
       if (sharedPref.contains("pedometerData")) {
           String pDataString = sharedPref.getString("pedometerData","{}");
           successCallback.invoke(pDataString);
       } else {
           errorCallback.invoke("No steps history found in stepCounterService !");
       }
    }

}
