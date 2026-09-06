package school.sptech.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import school.sptech.backend.Model.Vehicle;
import school.sptech.backend.Service.ImageStorageService;
import school.sptech.backend.Service.VehicleService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vehicles")
public class VehicleController {
    private final VehicleService vehicleService;
    private final ImageStorageService imageStorageService;

    public VehicleController(
            VehicleService vehicleService,
            ImageStorageService imageStorageService
    ) {
        this.vehicleService = vehicleService;
        this.imageStorageService = imageStorageService;
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.status(200).body(vehicleService.getAllVehicles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Integer id) {
        Vehicle vehicle = vehicleService.findById(id);

        if (vehicle.getId() == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(vehicle);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Vehicle> postVehicle(@RequestBody Vehicle bodyVehicle) {
        if (hasInvalidFields(bodyVehicle)) {
            return ResponseEntity.status(400).build();
        }

        if (bodyVehicle.getPlate() != null &&
                vehicleService.hasFoundByPlate(bodyVehicle.getPlate())) {
            return ResponseEntity.status(409).build();
        }

        Vehicle createdVehicle = vehicleService.postVehicle(bodyVehicle);
        return ResponseEntity.status(201).body(createdVehicle);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Vehicle> postVehicleWithImage(
            @RequestPart("vehicle") Vehicle bodyVehicle,
            @RequestPart("image") MultipartFile image
    ) {
        if (hasInvalidFields(bodyVehicle) || image.isEmpty()) {
            return ResponseEntity.status(400).build();
        }

        if (bodyVehicle.getPlate() != null &&
                vehicleService.hasFoundByPlate(bodyVehicle.getPlate())) {
            return ResponseEntity.status(409).build();
        }

        try {
            bodyVehicle.setImageUrl(imageStorageService.store(image));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).build();
        }

        Vehicle createdVehicle = vehicleService.postVehicle(bodyVehicle);
        return ResponseEntity.status(201).body(createdVehicle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Integer id) {
        int rowsAffected = vehicleService.deleteVehicle(id);

        if (rowsAffected == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> putVehicle(
            @PathVariable Integer id,
            @RequestBody Vehicle bodyVehicle
    ) {
        if (hasInvalidFields(bodyVehicle)) {
            return ResponseEntity.status(400).build();
        }

        Vehicle currentVehicle = vehicleService.findById(id);
        if (currentVehicle.getId() == null) {
            return ResponseEntity.status(404).build();
        }

        if (bodyVehicle.getImageUrl() == null) {
            bodyVehicle.setImageUrl(currentVehicle.getImageUrl());
        }

        if (hasPlateConflict(currentVehicle, bodyVehicle)) {
            return ResponseEntity.status(409).build();
        }

        return ResponseEntity.status(200).body(vehicleService.putVehicle(id, bodyVehicle));
    }

    private boolean hasPlateConflict(Vehicle currentVehicle, Vehicle newVehicle) {
        String newPlate = newVehicle.getPlate();
        String currentPlate = currentVehicle.getPlate();

        return newPlate != null &&
                !newPlate.equalsIgnoreCase(currentPlate) &&
                vehicleService.hasFoundByPlate(newPlate);
    }

    private boolean hasInvalidFields(Vehicle vehicle) {
        if (vehicle == null ||
                vehicle.getBrand() == null || vehicle.getBrand().isBlank() ||
                vehicle.getModel() == null || vehicle.getModel().isBlank() ||
                vehicle.getYear() == null ||
                vehicle.getPower() == null ||
                vehicle.getFuelTypes() == null || vehicle.getFuelTypes().isEmpty() ||
                vehicle.getFuelTypes().contains(null)) {
            return true;
        }

        if (vehicle.getPlate() != null &&
                (vehicle.getPlate().isBlank() || vehicle.getPlate().length() > 7)) {
            return true;
        }

        String state = vehicle.getState();
        return state != null &&
                !state.equals("Novo") &&
                !state.equals("Usado");
    }
}
