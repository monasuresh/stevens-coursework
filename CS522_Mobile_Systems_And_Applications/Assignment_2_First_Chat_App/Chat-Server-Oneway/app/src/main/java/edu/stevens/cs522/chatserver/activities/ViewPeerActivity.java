package edu.stevens.cs522.chatserver.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import edu.stevens.cs522.base.DateUtils;
import edu.stevens.cs522.base.InetAddressUtils;
import edu.stevens.cs522.chatserver.R;
import edu.stevens.cs522.chatserver.entities.Peer;

/**
 * Created by dduggan and msuresh.
 */

public class ViewPeerActivity extends Activity {

    public static final String PEER_KEY = "peer";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_peer);

        Peer peer = getIntent().getParcelableExtra(PEER_KEY);
        if (peer == null) {
            throw new IllegalArgumentException("Expected peer as intent extra");
        }

        // Code written by Monica Suresh

        TextView userNameTextView = (TextView) findViewById(R.id.view_user_name);
        TextView timestampTextView = (TextView) findViewById(R.id.view_timestamp);
        TextView locationTextView = (TextView) findViewById(R.id.view_location);

        userNameTextView.setText(getString(R.string.view_user_name, peer.name));
        timestampTextView.setText(getString(R.string.view_timestamp, formatTimestamp(peer.timestamp)));
        locationTextView.setText(getString(R.string.view_location, peer.latitude, peer.longitude));

    }

    private static String formatTimestamp(Date timestamp) {
        LocalDateTime dateTime = timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return dateTime.format(formatter);
    }

}
