package com.anna.cultivar.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Structure of folders:
 *   - tempfiles
 *          - tempfile.jpg
 *   - photo
 *     - department
 *       - recipeName
 *             - recipe123.jpg
 *             - recipe123-small.jpg
 */
public interface FileService {

    String saveTemporaryFile(MultipartFile file) throws IOException;

    /**
     * Deletes folder with recipe name and all its content
     */
    void deleteRecipeFolder(String department, String recipeName);

    void cleanTempFiles() throws IOException;

    String saveRecipeFile(String path, String department, String name);

	String saveIngredientFile(String path, String name);

	String saveVarietyFile(String path, String name);
}
