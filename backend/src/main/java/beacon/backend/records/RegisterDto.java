package beacon.backend.records;

public record RegisterDto(String id, String username, char[] password, String email, String address, Double lat, Double lng) {}
