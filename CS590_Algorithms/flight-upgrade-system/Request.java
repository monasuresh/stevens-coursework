import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class Request implements Comparable<Request>{
    private String key;
    private Date value;

    private int locator;

    List<String> definedOrder = Arrays.asList("super",
            "platinum", "gold", "silver");

    public Request(String key) {
        this.key = key;
        this.value = new Date();
    }

    public String getKey() {
        return key;
    }

    public Date getValue() {
        return value;
    }

    public int getLocator() {
        return locator;
    }

    public void setLocator(int locator) {
        this.locator = locator;
    }

    @Override
    public int compareTo(Request o) {
        int difference = Integer.valueOf(
                        definedOrder.indexOf(this.getKey()))
                .compareTo(
                        Integer.valueOf(
                                definedOrder.indexOf(o.getKey())));

        if (difference != 0) {
            return difference;
        }

        return this.value.compareTo(o.getValue());
    }

}
