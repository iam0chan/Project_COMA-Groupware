package com.coma.calendar.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coma.calendar.model.service.CalendarService;
import com.coma.model.dto.Calendar;
import com.coma.model.dto.Schedule;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {
	
	private final CalendarService service;
	
	@RequestMapping
	public String calendar() {
		
		return "/calendar/calendar";
	}
//	@GetMapping("/calender.do")
//	@ResponseBody
//	public List<Calendar> selectCalendar(){
//		System.out.println("안녕");
//		return service.selectCalender();
//	}
	@GetMapping("/calendar.do")
	@ResponseBody
	public List<Schedule> scheduleAll(){
		System.out.println("안녕");
		return service.scheduleAll();
	}

}