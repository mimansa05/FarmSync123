package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.CropDTO;

/**
 * CropService
 * 
 * Interface defining the business logic operations for Crops.
 * Provides a contract for creating, retrieving, updating, and deleting crops.
 */
public interface CropService {

	/**
	 * Creates a new crop record.
	 * 
	 * @param cropDTO The crop data to persist.
	 * @return The created CropDTO with generated ID.
	 */
	CropDTO createCrop(CropDTO cropDTO);
	
	/**
	 * Finds a crop record by its ID.
	 * 
	 * @param cropId The unique identifier of the crop.
	 * @return The CropDTO if found.
	 */
	CropDTO getCropById(Long cropId);
	
	/**
	 * Lists all crops in the system.
	 * 
	 * @return List of all CropDTOs.
	 */
	List<CropDTO> getAllCrops();
	
	/**
	 * Lists all crops belonging to a specific farm.
	 * 
	 * @param farmId The unique identifier of the farm.
	 * @return List of CropDTOs for the specified farm.
	 */
	List<CropDTO> getCropsByFarmId(Long farmId);
	
	/**
	 * Updates existing crop information.
	 * 
	 * @param cropId The ID of the crop to update.
	 * @param cropDTO The updated data.
	 * @return The updated CropDTO.
	 */
	CropDTO updateCrop(Long cropId, CropDTO cropDTO);
	
	/**
	 * Deletes a crop from the system.
	 * 
	 * @param cropId The unique identifier of the crop to delete.
	 */
	void deleteCrop(Long cropId);
}

