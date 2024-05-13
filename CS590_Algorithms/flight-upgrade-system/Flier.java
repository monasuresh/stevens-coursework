public class Flier {
    private String firstName;
    private String lastName;
    private String flyerStatus;
    private int locationInWaitingList;

    private boolean isCanceled;

    public Flier(String firstName, String lastName, String flyerStatus, int locationInWaitingList,
                 boolean isCanceled) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.flyerStatus = flyerStatus;
        this.locationInWaitingList = locationInWaitingList;
        this.isCanceled = isCanceled;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFlyerStatus() {
        return flyerStatus;
    }

    public void setFlyerStatus(String flyerStatus) {
        this.flyerStatus = flyerStatus;
    }

    public int getLocationInWaitingList() {
        return locationInWaitingList;
    }

    public void setLocationInWaitingList(int locationInWaitingList) {
        this.locationInWaitingList = locationInWaitingList;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }
}
