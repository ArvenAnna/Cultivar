package com.anna.cultivar.controller;

import com.anna.cultivar.dto.HybridisatorDto;
import com.anna.cultivar.service.HybridisatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = {"/hybridisators"}, headers = "Accept=application/json")
public class HybridisatorController {

    @Autowired
    private HybridisatorService hybridisatorService;

//    @RequestMapping(method = RequestMethod.GET)
//    public List<HybridisatorDto> hybridisatorsList() {
//        return hybridisatorService.getAll().collect(Collectors.toList());
//    }

    @RequestMapping(value = {"/{hybridisatorId}"}, method = RequestMethod.GET)
    public HybridisatorDto getHybridisator(@PathVariable("hybridisatorId") Long hybridisatorId) {
        return hybridisatorService.getOne(hybridisatorId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public HybridisatorDto saveHybridisator(@RequestBody @Valid @NotNull(message = "Request should not be null") HybridisatorDto dto) {
        return hybridisatorService.save(dto);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public HybridisatorDto updateHybridisator(@RequestBody @Valid @NotNull(message = "Request should not be null") HybridisatorDto dto) {
        return hybridisatorService.update(dto);
    }
}
