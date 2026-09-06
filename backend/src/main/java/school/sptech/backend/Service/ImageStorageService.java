package school.sptech.backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@Service
public class ImageStorageService {
    private static final Map<String, String> ALLOWED_TYPES = Map.of(
            "image/jpeg", ".jpg",
            "image/png", ".png",
            "image/webp", ".webp"
    );

    private final Path rootLocation;

    public ImageStorageService(@Value("${app.upload.dir:uploads/vehicles}") String uploadDir) {
        this.rootLocation = Path.of(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new UncheckedIOException("Não foi possível criar a pasta de imagens", e);
        }
    }

    public String store(MultipartFile image) {
        String extension = ALLOWED_TYPES.get(image.getContentType());
        if (image.isEmpty() || extension == null) {
            throw new IllegalArgumentException("A imagem deve ser JPG, PNG ou WEBP");
        }

        String filename = UUID.randomUUID() + extension;
        Path destination = rootLocation.resolve(filename).normalize();

        if (!destination.getParent().equals(rootLocation)) {
            throw new IllegalArgumentException("Nome de arquivo inválido");
        }

        try (var inputStream = image.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException("Não foi possível salvar a imagem", e);
        }

        return "/uploads/" + filename;
    }

    public Path getRootLocation() {
        return rootLocation;
    }
}
