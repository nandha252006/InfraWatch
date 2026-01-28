package in.nandhaonline.infrawatch.model;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Server {

    private String id;
    private String name;
    private String hostname;
    private String ip;
    private String status;

    private double cpu;
    private double memory;
    private double disk;

    private String uptime;
    private String os;
    private List<String> services;

    private LocalDateTime createdAt;   // ✅ NEW FIELD

    // ✅ Updated constructor
    public Server(String id, String name, String hostname, String ip,
                  String status, double cpu, double memory, double disk,
                  String uptime, String os, List<String> services,
                  LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.hostname = hostname;
        this.ip = ip;
        this.status = status;
        this.cpu = cpu;
        this.memory = memory;
        this.disk = disk;
        this.uptime = uptime;
        this.os = os;
        this.services = services;
        this.createdAt = createdAt;
    }

    // getters & setters
}

