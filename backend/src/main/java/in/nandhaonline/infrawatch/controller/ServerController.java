package in.nandhaonline.infrawatch.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.nandhaonline.infrawatch.model.Server;
import in.nandhaonline.infrawatch.service.ServerService;

@RestController
@RequestMapping("/api")
public class ServerController{

	ServerService sevService;
	public ServerController(ServerService sevService){
		this.sevService=sevService;
	}

	@GetMapping("/server/{id}")
	public Server getServer(@PathVariable String id){
		return sevService.getServerbyId(id);
	}
	@GetMapping("/server")
	public List<Server> getServer(){
		return sevService.getAllServer();
	}
	// @PutMapping("/server")
	// public List<Server> putServer(){
	// 	return "put request on Server page ";
	// }
	// @DeleteMapping("/server/{id}")
	// public List<Server> deleteServer(){
	// 	return "Delete a server from list";
	// }
}
