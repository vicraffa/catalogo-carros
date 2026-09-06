package school.sptech.backend.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum FuelType {
    GASOLINA_COMUM("Gasolina comum"),
    GASOLINA_ADITIVADA("Gasolina aditivada"),
    GASOLINA_PREMIUM("Gasolina premium"),
    ETANOL("Etanol"),
    DIESEL("Diesel"),
    GNV("GNV"),
    ELETRICO("Eletrico");

    private final String displayName;

    FuelType(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static FuelType fromValue(String value) {
        if (value == null) {
            throw new IllegalArgumentException("O tipo de combustível não pode ser nulo");
        }

        return Arrays.stream(values())
                .filter(type -> type.displayName.equalsIgnoreCase(value.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Tipo de combustível inválido: " + value
                ));
    }
}
