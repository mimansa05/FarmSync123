package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.ActivityDTO;

/**
 * ActivityService
 * 
 * Interface defining business logic for farm activities.
 * Manages the data flow between controllers and repositories for activity logging.
 */
public interface ActivityService {

	/**
	 * Persists a new activity log.
	 * 
	 * @param activityDTO The activity details (type, date, crop).
	 * @return The saved ActivityDTO with generated metadata.
	 */
	ActivityDTO createActivity(ActivityDTO activityDTO);
	
	/**
	 * Retrieves an activity by its ID.
	 * 
	 * @param activityId Unique ID of the activity log.
	 * @return The ActivityDTO if found.
	 */
	ActivityDTO getActivityById(Long activityId);
	
	/**
	 * Retrieves all activities filtered by a specific crop.
	 * 
	 * @param cropId The ID of the owner crop.
	 * @return List of matching ActivityDTOs.
	 */
	List<ActivityDTO> getActivitiesByCropId(Long cropId);
	
	/**
	 * Updates existing activity details.
	 * 
	 * @param activityId ID of the activity to update.
	 * @param activityDTO New activity data.
	 * @return The updated ActivityDTO.
	 */
	ActivityDTO updateActivity(Long activityId, ActivityDTO activityDTO);
	
	/**
	 * Permanently deletes an activity record.
	 * 
	 * @param activityId ID of the activity to remove.
	 */
	void deleteActivity(Long activityId);
}

