package com.coma.commute.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
@Repository
public class CommuteDaoImpl implements CommuteDao {

	@Override
	public int insertCommute(SqlSession session, @RequestBody HashMap<String, Object> empId) {
		// TODO Auto-generated method stub
		return session.insert("commute.insertCommute",empId);
	}

	@Override
	public int updateClockout(SqlSession session, Map<String, Object> emp) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateStartTime(SqlSession session, Map<String, Object> emp) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateEndTime(SqlSession session, Map<String, Object> emp) {
		// TODO Auto-generated method stub
		return 0;
	}

}
