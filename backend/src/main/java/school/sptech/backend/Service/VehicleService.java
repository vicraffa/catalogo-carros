package school.sptech.backend.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.sptech.backend.Model.Vehicle;
import school.sptech.backend.Repository.VehicleRepository;

import java.util.List;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.getAllVehicles();
    }

    public Vehicle findById(Integer id) {
        return vehicleRepository.getVehicleById(id);
    }

    @Transactional
    public Vehicle postVehicle(Vehicle vehicle) {
        return vehicleRepository.postVehicle(vehicle);
    }

    @Transactional
    public Integer deleteVehicle(Integer id) {
        return vehicleRepository.deleteVehicle(id);
    }

    @Transactional
    public Vehicle putVehicle(Integer id, Vehicle vehicle) {
        return vehicleRepository.putVehicle(id, vehicle);
    }

    public Boolean hasFoundById(Integer id) {
        return vehicleRepository.hasFoundById(id);
    }

    public Boolean hasFoundByModel(String model) {
        return vehicleRepository.hasFoundByModel(model);
    }

    public Boolean hasFoundByPlate(String plate) {
        return vehicleRepository.hasFoundByPlate(plate);
    }
}
