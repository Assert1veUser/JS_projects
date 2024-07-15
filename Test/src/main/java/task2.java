import java.util.*;

public class task2 {
    List<Map<String, String>> list = new ArrayList<>(){
    };
    Map<String, String> itemselected1 = new HashMap<>();
    Map<String, String> itemselected2 = new HashMap<>();
    Map<String, String> itemselected3 = new HashMap<>();
    Map<String, String> itemselected4 = new HashMap<>();
    public void task(){
        itemselected1.put("имя", "Кирилл");
        itemselected1.put("возраст", "26");
        itemselected1.put("должность", "Middle java dev");
        itemselected1.put("зарплата", "150000 руб");
        list.add(0, itemselected1);
        itemselected1.put("имя", "Виталий");
        itemselected1.put("возраст", "28");
        itemselected1.put("должность", "Senior java automation QA");
        itemselected1.put("зарплата", "2000$");
        list.add(1, itemselected2);
        itemselected1.put("имя", "Александр");
        itemselected1.put("возраст", "31");
        itemselected1.put("должность", "junior functional tester");
        itemselected1.put("зарплата", "50000 руб");
        list.add(2, itemselected3);
        itemselected1.put("имя", "Дементий");
        itemselected1.put("возраст", "35");
        itemselected1.put("должность", "dev-ops");
        itemselected1.put("зарплата", "1500$");
        list.add(3, itemselected4);
    }
}
