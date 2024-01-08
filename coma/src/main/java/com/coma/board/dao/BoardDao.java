package com.coma.board.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.coma.model.dto.Board;

public interface BoardDao {
	
	List<Board> selectBoardByType(SqlSession session, int BoardType);
	
	Board selectBoardByNo(SqlSession session, int boardNo);
	
	int insertBoard(SqlSession session, Board b);
	
	int selectBoardCount(SqlSession session);
}
