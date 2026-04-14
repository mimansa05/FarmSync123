package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.ActivityDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.ActivityService;
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
 * ActivityController
 * 
 * REST controller for managing farm Activity records (e.g., Irrigation, Fertilization).
 * Handles HTTP requests related to creating, viewing, and deleting farm logs.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/activities")
public class ActivityController {

	private final ActivityService activityService;
	
	/**
	 * Logs a new farm activity.
	 * 
	 * @param activityDTO Data transfer object containing activity details like type, date, and crop ID.
	 * @return ResponseEntity containing the created ActivityDTO record.
	 */
	@PostMapping
	public ResponseEntity<ActivityDTO> createActivity(@Valid @RequestBody ActivityDTO activityDTO) {
		ActivityDTO createdActivity = activityService.createActivity(activityDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdActivity);
	}
	
	/**
	 * Retrieves an activity log by its primary identifier.
	 * 
	 * @param id The unique ID of the activity.
	 * @return ResponseEntity containing the ActivityDTO.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<ActivityDTO> getActivityById(@PathVariable Long id) {
		return ResponseEntity.ok(activityService.getActivityById(id));
	}
	
	/**
	 * Retrieves all activities associated with a specific crop cycle.
	 * 
	 * @param cropId The ID of the crop for which activities are being tracked.
	 * @return ResponseEntity containing a list of activities for that crop.
	 */
	@GetMapping("/crop/{cropId}")
	public ResponseEntity<List<ActivityDTO>> getActivitiesByCropId(@PathVariable Long cropId) {
		return ResponseEntity.ok(activityService.getActivitiesByCropId(cropId));
	}
	
	/**
	 * Updates existing activity details.
	 * 
	 * @param id The identifier of the activity to update.
	 * @param activityDTO The updated activity data.
	 * @return ResponseEntity with the updated record.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<ActivityDTO> updateActivity(@PathVariable Long id, @Valid @RequestBody ActivityDTO activityDTO) {
		return ResponseEntity.ok(activityService.updateActivity(id, activityDTO));
	}
	
	/**
	 * Deletes an activity record from the history.
	 * 
	 * @param id The unique identifier of the activity record to remove.
	 * @return ResponseEntity success confirmation.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteActivity(@PathVariable Long id) {
		activityService.deleteActivity(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Activity deleted successfully", true));
	}
}

