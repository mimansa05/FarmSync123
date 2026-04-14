package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.CropDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.CropService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * CropController
 * 
 * REST controller for managing Crop-related operations.
 * Provides endpoints for creating, retrieving, updating, and deleting crop records.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/crops")
public class CropController {

	private final CropService cropService;
	
	/**
	 * Creates a new crop record in the system.
	 * 
	 * @param cropDTO The crop data transfer object containing crop details.
	 * @return ResponseEntity containing the created CropDTO and HTTP status 201.
	 */
	@PostMapping
	public ResponseEntity<CropDTO> createCrop(@Valid @RequestBody CropDTO cropDTO) {
		CropDTO createdCrop = cropService.createCrop(cropDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCrop);
	}
	
	/**
	 * Retrieves a specific crop by its unique identifier.
	 * 
	 * @param id The ID of the crop to retrieve.
	 * @return ResponseEntity containing the requested CropDTO.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<CropDTO> getCropById(@PathVariable Long id) {
		return ResponseEntity.ok(cropService.getCropById(id));
	}
	
	/**
	 * Retrieves all crop records available in the system.
	 * 
	 * @return ResponseEntity containing a list of all CropDTOs.
	 */
	@GetMapping
	public ResponseEntity<List<CropDTO>> getAllCrops() {
		return ResponseEntity.ok(cropService.getAllCrops());
	}
	
	/**
	 * Retrieves all crops associated with a specific farm.
	 * 
	 * @param farmId The unique identifier of the farm.
	 * @return ResponseEntity containing a list of CropDTOs for the specified farm.
	 */
	@GetMapping("/farm/{farmId}")
	public ResponseEntity<List<CropDTO>> getCropsByFarmId(@PathVariable Long farmId) {
		return ResponseEntity.ok(cropService.getCropsByFarmId(farmId));
	}
	
	/**
	 * Updates an existing crop record identified by the given ID.
	 * 
	 * @param id The ID of the crop to update.
	 * @param cropDTO The updated crop data.
	 * @return ResponseEntity containing the updated CropDTO.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<CropDTO> updateCrop(@PathVariable Long id, @Valid @RequestBody CropDTO cropDTO) {
		return ResponseEntity.ok(cropService.updateCrop(id, cropDTO));
	}
	
	/**
	 * Deletes a crop record from the system.
	 * 
	 * @param id The ID of the crop to delete.
	 * @return ResponseEntity containing a success message and boolean status.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteCrop(@PathVariable Long id) {
		cropService.deleteCrop(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Crop deleted successfully", true));
	}
}

