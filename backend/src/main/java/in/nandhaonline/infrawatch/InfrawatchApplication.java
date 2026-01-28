package in.nandhaonline.infrawatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import in.nandhaonline.infrawatch.controller.ServerController;

@SpringBootApplication
public class InfrawatchApplication {

	public static void main(String[] args) {
		ApplicationContext context= SpringApplication.run(InfrawatchApplication.class, args);
	  ServerController server=context.getBean(ServerController.class);
	}

}
