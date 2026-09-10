export async function fetchVehicles() {
        try {
            const response = await fetch("http://localhost:8080/vehicles");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            return [];
        }
}

export async function postVehicle(vehicle) {
    return fetch("http://localhost:8080/vehicles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
    });
}

export async function postVehicleWithImage(vehicle, image) {
    const formData = new FormData();
    formData.append(
        "vehicle",
        new Blob([JSON.stringify(vehicle)], { type: "application/json" }),
    );
    formData.append("image", image);

    // O navegador define o Content-Type com o boundary do multipart.
    return fetch("http://localhost:8080/vehicles", {
        method: "POST",
        body: formData,
    });
}
