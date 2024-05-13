package edu.stevens.cs522.chatserver.entities;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.Date;

import edu.stevens.cs522.base.DateUtils;

/**
 * Created by dduggan and msuresh.
 */

public class Peer implements Parcelable {

    // Will be database key
    public long id;

    public String name;

    // Last time we heard from this peer.
    public Date timestamp;

    // Where we heard from them
    public Double latitude;

    public Double longitude;

    public Peer() {
    }

    @Override
    public String toString() {
        // Code written by Monica Suresh
        return name;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public Peer(Parcel in) {
        // Code written by Monica Suresh
        id = in.readLong();
        name = in.readString();
        timestamp = DateUtils.readDate(in);
        latitude = in.readDouble();
        longitude = in.readDouble();
    }

    @Override
    public void writeToParcel(Parcel out, int flags) {
        // Code written by Monica Suresh
        out.writeLong(id);
        out.writeString(name);
        DateUtils.writeDate(out, timestamp);
        out.writeDouble(latitude);
        out.writeDouble(longitude);
    }

    public static final Creator<Peer> CREATOR = new Creator<Peer>() {

        @Override
        public Peer createFromParcel(Parcel source) {
            // Code written by Monica Suresh
            return new Peer(source);
        }

        @Override
        public Peer[] newArray(int size) {
            // Code written by Monica Suresh
            return new Peer[size];
        }

    };
}
