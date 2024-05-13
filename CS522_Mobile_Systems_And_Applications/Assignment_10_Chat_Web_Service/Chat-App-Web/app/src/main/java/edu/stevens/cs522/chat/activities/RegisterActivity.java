/*********************************************************************

 Chat server: accept chat messages from clients.

 Sender chatName and GPS coordinates are encoded
 in the messages, and stripped off upon receipt.

 Copyright (c) 2017 Stevens Institute of Technology

 **********************************************************************/
package edu.stevens.cs522.chat.activities;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import edu.stevens.cs522.chat.R;
import edu.stevens.cs522.chat.rest.ChatHelper;
import edu.stevens.cs522.chat.services.RegisterService;
import edu.stevens.cs522.chat.settings.Settings;

public class RegisterActivity extends Activity implements OnClickListener {

    final static public String TAG = RegisterActivity.class.getCanonicalName();

    /*
     * Widgets for server Uri, chat name, register button.
     */
    private EditText serverUriText;

    private EditText userNameText;

    /*
     * Helper for Web service
     */
    private ChatHelper helper;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        /**
         * We only get to register once.
         */
        if (Settings.isRegistered(this)) {
            finish();
            return;
        }

        setContentView(R.layout.register);

        // TODO - instantiate helper for service (remember to use static context!)
        helper = new ChatHelper(getApplicationContext());

        serverUriText = (EditText) findViewById(R.id.chat_server_text);
        serverUriText.setText(getString(R.string.server_uri_default));

        userNameText = (EditText) findViewById(R.id.chat_name_text);

        Button registerButton = (Button) findViewById(R.id.register_button);
        registerButton.setOnClickListener(this);

    }

    public void onResume() {
        super.onResume();
    }

    public void onPause() {
        super.onPause();
    }

    public void onDestroy() {
        super.onDestroy();
    }

    /*
     * Callback for the REGISTER button.
     */
    public void onClick(View v) {

        if (!Settings.isRegistered(this) && helper != null) {

            String serverAddress = serverUriText.getText().toString();
            if (serverAddress.isEmpty()) {
                Log.d(TAG, "Empty server URI for registration!");
                return;
            }

            if (!serverAddress.endsWith("/")) {
                serverAddress += "/";
            }
            Log.d(TAG, "Registering with server URI: "+serverAddress);

            Uri serverUri = Uri.parse(serverUriText.getText().toString()).normalizeScheme();

            String userName = userNameText.getText().toString();
            if (userName.isEmpty()) {
                Log.d(TAG, "Empty chat name for registration!");
                return;
            }
            Log.d(TAG, "Registering with chat name: "+userName);

            // TODO - use helper to register
            helper.register(serverUri, userName);


        } else {

            Toast.makeText(this, "Already Registered!", Toast.LENGTH_LONG).show();

        }

    }

}