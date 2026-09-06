package school.sptech.backend.Model;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class Vehicle {
    private Integer id;
    private String brand;
    private String model;
    private Integer year;
    private Integer power;
    private String plate;
    private String state;
    private String imageUrl;
    private List<FuelType> fuelTypes = new ArrayList<>();

    public Vehicle() {}

    public Vehicle(Integer id, String brand, String model, Integer year, Integer power, String plate, String state, String imageUrl) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.power = power;
        this.plate = plate;
        this.state = state;
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<FuelType> getFuelTypes() {
        return fuelTypes;
    }

    public void setFuelTypes(List<FuelType> fuelTypes) {
        this.fuelTypes = fuelTypes == null
                ? new ArrayList<>()
                : new ArrayList<>(new LinkedHashSet<>(fuelTypes));
    }
}
