package edu.stevens.cs522.hello;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class ShowActivity extends Activity {
    public final static String MESSAGE_KEY = "message";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show);
        TextView textview = (TextView) findViewById(R.id.message);
        String text = getIntent().getStringExtra(MESSAGE_KEY);
        String message = getResources().getString(R.string.show_name, text);
        textview.setText(message);
    }
}