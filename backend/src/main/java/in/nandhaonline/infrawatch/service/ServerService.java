package in.nandhaonline.infrawatch.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import in.nandhaonline.infrawatch.model.Server;
import in.nandhaonline.infrawatch.repository.ServerRepository;

@Service
public class ServerService{
	public final ServerRepository severRepo;
	List<Integer> list=new ArrayList<>();
	ServerService(ServerRepository severRepo){
		this.severRepo=severRepo;
	}
	public Server getServerbyId(String id){
		return severRepo.findById(id);
	}
	public List<Server> getAllServer(){
		return severRepo.findAll();
	}
}

