package edu.stevens.cs522.chatserver.entities;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.room.Entity;
import androidx.room.Index;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import java.util.Date;

import edu.stevens.cs522.base.DateUtils;

/**
 * Created by dduggan.
 */

/*
 * TODO annotate as entity object - code written by msuresh
 *
 * Since foreign keys reference the name field, we need to define a unique index on that.
 */
@Entity(indices = {@Index(value = {"name"}, unique = true)})
public class Peer implements Parcelable {

    // TODO primary key - code written by msuresh
    @PrimaryKey(autoGenerate = true)
    public long id;

    public String name;

    // Last time we heard from this peer.
    public Date timestamp;

    // Where we heard from them
    public Double latitude;

    public Double longitude;

    @Override
    public String toString() {
        return name;
    }

    public Peer() {
    }

    public Peer(Parcel in) {
        // TODO - code written by msuresh
        id = in.readLong();
        name = in.readString();
        timestamp = DateUtils.readDate(in);
        latitude = in.readDouble();
        longitude = in.readDouble();
    }

    @Override
    public void writeToParcel(Parcel out, int flags) {
        // TODO - code written by msuresh
        out.writeLong(id);
        out.writeString(name);
        DateUtils.writeDate(out, timestamp);
        out.writeDouble(latitude);
        out.writeDouble(longitude);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Peer> CREATOR = new Creator<Peer>() {

        @Override
        public Peer createFromParcel(Parcel source) {
            // TODO - code written by msuresh
            return new Peer(source);
        }

        @Override
        public Peer[] newArray(int size) {
            // TODO - code written by msuresh
            return new Peer[size];
        }

    };
}
