/*********************************************************************

    Chat server: accept chat messages from clients.
    
    Sender name and GPS coordinates are encoded
    in the messages, and stripped off upon receipt.

    Copyright (c) 2017 Stevens Institute of Technology

**********************************************************************/
package edu.stevens.cs522.chatserver.activities;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.util.JsonReader;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ListView;

import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.LiveData;

import java.io.StringReader;
import java.util.Date;
import java.util.List;

import edu.stevens.cs522.base.Datagram;
import edu.stevens.cs522.base.DatagramConnectionFactory;
import edu.stevens.cs522.base.IDatagramConnection;
import edu.stevens.cs522.chatserver.R;
import edu.stevens.cs522.chatserver.databases.ChatDatabase;
import edu.stevens.cs522.chatserver.databases.MessageDao;
import edu.stevens.cs522.chatserver.databases.PeerDao;
import edu.stevens.cs522.chatserver.entities.Message;
import edu.stevens.cs522.chatserver.entities.Peer;
import edu.stevens.cs522.chatserver.ui.MessagesAdapter;

public class ChatServerActivity extends FragmentActivity implements OnClickListener {

	final static public String TAG = ChatServerActivity.class.getCanonicalName();

    public final static String SENDER_NAME = "name";

    public final static String CHATROOM = "room";

    public final static String MESSAGE_TEXT = "text";

    public final static String TIMESTAMP = "timestamp";

    public final static String LATITUDE = "latitude";

    public final static String LONGITUDE = "longitude";
		
	/*
	 * Socket used both for sending and receiving
	 */
    private IDatagramConnection serverConnection;


    /*
	 * True as long as we don't get socket errors
	 */
	private boolean socketOK = true;

    /*
     * Data access objects.
     */
    private ChatDatabase chatDatabase;

    private MessageDao messageDao;

    private PeerDao peerDao;


    /*
	 * Called when the activity is first created. 
	 */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
        setContentView(R.layout.view_messages);

        /**
         * Let's be clear, this is a HACK to allow you to do network communication on the messages thread.
         * This WILL cause an ANR, and is only provided to simplify the pedagogy.  We will see how to do
         * this right in a future assignment (using a Service managing background threads).
         */
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        try {
            /*
             * Get port information from the resources.
             */
            int port = getResources().getInteger(R.integer.app_port);

            DatagramConnectionFactory factory = new DatagramConnectionFactory();
            serverConnection = factory.getUdpConnection(port);

        } catch (Exception e) {
            throw new IllegalStateException("Cannot open socket", e);
        }

        Log.d(TAG, "Initializing the UI with no messages....");

        /*
         * List of messages and adapter.
         */
        ListView messageList = (ListView) findViewById(R.id.message_list);
        MessagesAdapter messagesAdapter = new MessagesAdapter(this);
        messageList.setAdapter(messagesAdapter);

        Log.d(TAG, "Opening the database....");
        // Note use getApplicationContext, do not make DB depend on UI!
        // Code written by msuresh
        chatDatabase = ChatDatabase.getInstance(getApplicationContext());

        Log.d(TAG, "Querying the database asynchronously....");
        // Note: The adapter has a method for resetting the backing store.

        // Code written by msuresh

        messageDao = chatDatabase.messageDao();
        peerDao = chatDatabase.peerDao();

        LiveData<List<Message>> messages = messageDao.fetchAllMessages();
        messages.observe(this, ms -> {
            messagesAdapter.setElements(ms);
            messagesAdapter.notifyDataSetChanged();
        });

        Log.d(TAG, "Binding the callback for the NEXT button....");
        Button nextButton = (Button) findViewById(R.id.next);
        nextButton.setOnClickListener(this);

	}

    @Override
    public void onStart() {
        super.onStart();
        Log.i(TAG, "Starting ChatServerActivity");
    }

    @Override
    public void onResume() {
        super.onResume();
        Log.i(TAG, "Resuming ChatServerActivity");
    }

    public void onClick(View v) {

		Datagram receivePacket = new Datagram();

		try {

            String sender = null;

            String room = null;

            String text = null;

            Date timestamp = null;

            Double latitude = null;

            Double longitude = null;

            /*
             * THere is an apparent bug in the emulator stack on Windows where
             * messages can arrive empty, we loop as a workaround.
             */

            Log.d(TAG, "Waiting for a message....");
            serverConnection.receive(receivePacket);
            Log.d(TAG, "Received a packet!");

            if (receivePacket.getData() == null) {
                Log.d(TAG, "....missing data, skipping....");
                return;
            }

            Log.d(TAG, "Source Address: " + receivePacket.getAddress());

            String content = receivePacket.getData();
            Log.d(TAG, "Message received: " + content);

            /*
             * Parse the JSON object
             */
            JsonReader rd = new JsonReader(new StringReader(content));

            rd.beginObject();
            if (SENDER_NAME.equals(rd.nextName())) {
                sender = rd.nextString();
            }
            if (CHATROOM.equals(rd.nextName())) {
                room = rd.nextString();
            }
            if (MESSAGE_TEXT.equals((rd.nextName()))) {
                text = rd.nextString();
            }
            if (TIMESTAMP.equals(rd.nextName())) {
                timestamp = new Date(rd.nextLong());
            }
            if (LATITUDE.equals(rd.nextName())) {
                latitude = rd.nextDouble();
            }
            if (LONGITUDE.equals((rd.nextName()))) {
                longitude = rd.nextDouble();
            }
            rd.endObject();

            rd.close();

            /*
             * Add the sender to our list of senders
             */
            Peer peer = new Peer();
            peer.name = sender;
            peer.timestamp = timestamp;
            peer.latitude = latitude;
            peer.longitude = longitude;

            Message message = new Message();
            message.messageText = text;
            message.chatroom = room;
            message.sender = sender;
            message.timestamp = timestamp;
            message.latitude = latitude;
            message.longitude = longitude;

            /*
             * The livedata for the messages should update via observer automatically.
             */

            // Code written by msuresh
            peerDao.upsert(peer);
            messageDao.persist(message);


		} catch (Exception e) {
			
			Log.e(TAG, "Problems receiving packet: " + e.getMessage(), e);
			socketOK = false;
		} 

	}

	/*
	 * Close the socket before exiting application
	 */
	public void closeSocket() {
	    if (serverConnection != null) {
            serverConnection.close();
            serverConnection = null;
        }
	}

	/*
	 * If the socket is OK, then it's running
	 */
	boolean socketIsOK() {
		return socketOK;
	}

    @Override
    public void onPause() {
        super.onPause();
        Log.i(TAG, "Pausing ChatServer activity....");
    }

    @Override
    public void onStop() {
        super.onStop();
        Log.i(TAG, "Stopping ChatServer activity....");
    }

    public void onDestroy() {
        super.onDestroy();
        chatDatabase = null;
        closeSocket();
        Log.i(TAG, "Destroying ChatServer activity....");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Code written by msuresh
        super.onCreateOptionsMenu(menu);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.chatserver_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        super.onOptionsItemSelected(item);
        int itemId = item.getItemId();
        if (itemId == R.id.peers) {
            // Code written by msuresh
            // The subactivity will query the database for the list of peers.
            Intent intent = new Intent(this, ViewPeersActivity.class);
            startActivity(intent);
            return true;

        }
        return false;
    }

}