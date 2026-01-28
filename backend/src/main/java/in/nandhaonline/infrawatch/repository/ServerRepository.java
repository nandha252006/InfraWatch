package in.nandhaonline.infrawatch.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Repository;

import in.nandhaonline.infrawatch.model.Server;

@Repository
public class ServerRepository {

    private final List<Server> servers = new ArrayList<>();

    public ServerRepository() {

        servers.add(new Server(
            "1",
            "web-server-01",
            "web01.example.com",
            "192.168.1.10",
            "healthy",
            45.2,
            62.8,
            34.5,
            "45d 12h",
            "Ubuntu 22.04",
            Arrays.asList("nginx", "nodejs", "redis"),
            LocalDateTime.now().minusDays(45)   // ✅ createdAt
        ));

        servers.add(new Server(
            "2",
            "db-server-01",
            "db01.example.com",
            "192.168.1.20",
            "warning",
            78.5,
            89.2,
            67.3,
            "120d 8h",
            "Ubuntu 22.04",
            Arrays.asList("postgresql", "redis"),
            LocalDateTime.now().minusDays(120)  // ✅ createdAt
        ));
    }

    public List<Server> findAll() {
        return servers;
    }

    public Server findById(String id) {
        return servers.stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}

