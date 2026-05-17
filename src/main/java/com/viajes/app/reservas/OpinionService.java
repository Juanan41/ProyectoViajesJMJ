package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class OpinionService {

    @Autowired
    private OpinionRepository opinionRepository;

    @Autowired
    private AlojamientoRepository alojamientoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<OpinionDTO> getOpinionesByAlojamiento(Long alojamientoId) {
        return opinionRepository.findByAlojamientoId(alojamientoId).stream()
                .map(OpinionService::toDTO)
                .collect(Collectors.toList());
    }

    public List<OpinionDTO> getMisOpiniones(String emailUsuario) {
        return opinionRepository.findByUsuarioEmailOrderByFechaOpinionDesc(emailUsuario).stream()
                .map(OpinionService::toDTO)
                .collect(Collectors.toList());
    }

    public OpinionDTO addOpinion(Long alojamientoId, CreateOpinionDTO createOpinionDTO, String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId)
                .orElseThrow(() -> new RuntimeException("Alojamiento no encontrado"));

        Opinion opinion = new Opinion();
        opinion.setAlojamiento(alojamiento);
        opinion.setUsuario(usuario);
        opinion.setPuntuacion(createOpinionDTO.getPuntuacion());
        opinion.setComentario(createOpinionDTO.getComentario());
        opinion.setFechaOpinion(LocalDateTime.now());

        Opinion saved = opinionRepository.save(opinion);
        return toDTO(saved);
    }

    @Transactional
    public void deleteOpinion(Long id, String emailUsuario) {
        Opinion opinion = opinionRepository.findByIdAndUsuarioEmail(id, emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Opinion no encontrada"));

        opinionRepository.delete(opinion);
    }

    @Transactional
    public OpinionDTO updateOpinion(Long id, CreateOpinionDTO dto, String emailUsuario) {
        Opinion opinion = opinionRepository.findByIdAndUsuarioEmail(id, emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Opinion no encontrada"));

        opinion.setPuntuacion(dto.getPuntuacion());
        opinion.setComentario(dto.getComentario());
        opinion.setFechaOpinion(LocalDateTime.now());

        return toDTO(opinionRepository.save(opinion));
    }

    public static OpinionDTO toDTO(Opinion opinion) {
        OpinionDTO dto = new OpinionDTO();
        dto.setId(opinion.getId());
        if (opinion.getAlojamiento() != null) {
            dto.setAlojamientoId(opinion.getAlojamiento().getId());
            dto.setAlojamientoNombre(opinion.getAlojamiento().getNombre());
            if (opinion.getAlojamiento().getDestino() != null) {
                dto.setDestinoNombre(opinion.getAlojamiento().getDestino().getNombre());
            }
        }
        if (opinion.getUsuario() != null) {
            dto.setUsuarioId(opinion.getUsuario().getId());
            dto.setNombreUsuario(opinion.getUsuario().getUsername());
        }
        dto.setPuntuacion(opinion.getPuntuacion());
        dto.setComentario(opinion.getComentario());
        dto.setFechaOpinion(opinion.getFechaOpinion());
        return dto;
    }
}
