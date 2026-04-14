package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.ActivityDTO;
import org.infyntrek.farmsync.entity.Activity;
import org.infyntrek.farmsync.entity.Crop;
import org.infyntrek.farmsync.exception.ResourceNotFoundException;
import org.infyntrek.farmsync.mapper.ActivityMapper;
import org.infyntrek.farmsync.repository.ActivityRepository;
import org.infyntrek.farmsync.repository.CropRepository;
import org.infyntrek.farmsync.service.ActivityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

/**
 * ActivityServiceImpl
 * 
 * Implementation of ActivityService providing core business logic for farm activities.
 * Handles persistence, entity mapping, and transactional integrity for activity logs.
 */
@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
	
	private final ActivityRepository activityRepository;
	private final ActivityMapper activityMapper;
	private final CropRepository cropRepository;

	/**
	 * Creates a new farm activity record.
	 * Mapping includes converting DTO to Entity and establishing relationships with Crops.
	 * 
	 * @param activityDTO The activity data from the client.
	 * @return The saved ActivityDTO record.
	 */
	@Override
	public ActivityDTO createActivity(ActivityDTO activityDTO) {
	    Activity activity = activityMapper.toEntity(activityDTO);

	    if (activityDTO.getCropId() != null) {
	        Crop crop = cropRepository.findById(activityDTO.getCropId())
	                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + activityDTO.getCropId()));
	        activity.setCrop(crop);
	    }

	    return activityMapper.toDTO(activityRepository.save(activity));
	}

	/**
	 * Retrieves an activity log by its primary ID.
	 * 
	 * @param activityId The unique ID of the activity.
	 * @return The mapped ActivityDTO.
	 */
	@Override
	public ActivityDTO getActivityById(Long activityId) {
		Activity activity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		return activityMapper.toDTO(activity);
	}

	/**
	 * Fetches all activity logs associated with a specific crop.
	 * 
	 * @param cropId The unique identifier of the crop.
	 * @return A list of ActivityDTOs.
	 */
	@Override
	public List<ActivityDTO> getActivitiesByCropId(Long cropId) {
		List<Activity> activities = activityRepository.findByCropCropId(cropId);
		
		return activities.stream()
				.map(activityMapper::toDTO)
				.collect(Collectors.toList());
	}

	/**
	 * Updates an existing activity log with new information.
	 * 
	 * @param activityId The ID of the activity record to update.
	 * @param activityDTO The new state to be saved.
	 * @return The updated ActivityDTO.
	 */
	@Override
	@Transactional
	public ActivityDTO updateActivity(Long activityId, ActivityDTO activityDTO) {
		Activity existingActivity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		existingActivity.setActivityType(activityDTO.getActivityType());
		existingActivity.setDate(activityDTO.getDate());
		existingActivity.setDescription(activityDTO.getDescription());
		
		// Update parent crop relationship if needed
		if(activityDTO.getCropId() != null) {
			Crop crop = cropRepository.findById(activityDTO.getCropId())
					.orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + activityDTO.getCropId()));
			
			existingActivity.setCrop(crop);
		}
		
		Activity updatedActivity = activityRepository.save(existingActivity);
		
		return activityMapper.toDTO(updatedActivity);
	}

	/**
	 * Removes an activity record from the system history.
	 * 
	 * @param activityId The ID of the activity to delete.
	 */
	@Override
	@Transactional
	public void deleteActivity(Long activityId) {
		Activity activity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		activityRepository.delete(activity);
	}

}

