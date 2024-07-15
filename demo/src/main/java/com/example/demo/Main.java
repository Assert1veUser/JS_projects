package org.example;
import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws IOException {
//данные из таблицы
        var dataMap = readCsv();
//выходная директория
        var outputDirName = "src/main/resources/outputs";
//директория с дампами
        var resourcesDirPath = "src/main/resources";
        for(var dataEntry: dataMap.entrySet()) {
            String ddName = dataEntry.getKey();
            Map<String, List<Main.FileInfo>> fileInfo = dataEntry.getValue();
            for(var fileParts: fileInfo.entrySet()) {
                String fileName = fileParts.getKey();
                List<FileInfo> parts = fileParts.getValue();
                getFile(
                        new File(resourcesDirPath, ddName).getAbsolutePath(),
                        new File(outputDirName, fileName).getAbsolutePath(),
                        parts

                );
            }
        }
    }

    private static void getFile(String fileFrom, String fileTo, int startSec,
                                int readInBytes, boolean append) throws IOException{
        var bytesInSec = 512;
        var buffer = new byte[readInBytes];
        var fileToCreate = new File(fileTo);
        if(!fileToCreate.exists()) {
            fileToCreate.createNewFile();
        }
        try(var reader = new FileInputStream(fileFrom)) {
            reader.skip(bytesInSec * startSec);
            reader.read(buffer);
        }
        try(var writer = new FileOutputStream(fileTo, append)) {
            writer.write(buffer);

        }
    }

    private static void getFile(String fileFrom, String fileName,
                                List<FileInfo> parts) throws IOException{
        for(var part: parts) {
            getFile(
                    fileFrom,
                    fileName,
                    part.startSector,
                    part.fileSize,
                    true
            );
        }
    }

    private static Map<String, Map<String, List<FileInfo>>> readCsv() throws
            IOException {
        String currentFile;
        var csv = "C:\\Users\\ilyas\\Documents\\Obsidian\\notes\\Notes\\Education\\Компьютерная экспертиза\\practice4.txt";
        Map<String, Map<String, List<FileInfo>>> data = new HashMap<>();
        try (BufferedReader br = new BufferedReader(new FileReader(csv))) {
            String line;
            String fileType = "";
            while ((line = br.readLine()) != null) {

                if(line.contains("L5")) {
                    fileType = line.split(" ")[0];
                    data.put(fileType, new HashMap<>());

                    br.readLine();//skip labels
                    continue;

                }
                String[] values = line.replace(",", "").split(";");
                if(!values[0].equals("Fill (Заполнение)")) {


                    continue;

                }
                String[] fileNameParts = values[0].split(" ");
                String fileName = fileNameParts[0];
                int filePart = Integer.parseInt(

                        String.valueOf(fileNameParts[1].charAt(1)));
                int fileSize = Integer.parseInt(values[1]);
                int startSector = Integer.parseInt(values[2]);
                int endSector = Integer.parseInt(values[3]);
                FileInfo fileInfo = new FileInfo(
                        filePart,
                        fileSize,
                        startSector,
                        endSector

                );
                if(data.get(fileType).containsKey(fileName)) {
                    data.get(fileType).get(fileName).add(fileInfo);
                } else {
                    data.get(fileType)

                            .put(fileName, new ArrayList<>(List.of(fileInfo)));

                }
            }
        }
        return data;
    }

    private record FileInfo(
            int filePart,
            int fileSize,
            int startSector,
            int endSector
    ) { }
}