package beacon.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import beacon.backend.records.SightingDto;
import beacon.backend.repositories.SightingRepository;

@Service
public class SightingService {

    @Autowired
    SightingRepository sightingRepository;
    
    public void postSighting(SightingDto sightingDto) {
        sightingRepository.postSighting(sightingDto);
    }
}
