package com.barney.hackathon.dao;

import com.barney.hackathon.entity.Order;
import com.barney.hackathon.vo.AcceptVO;
import com.barney.hackathon.vo.FinishVO;
import com.barney.hackathon.vo.PublishOrderVO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderDao {

    @Insert("insert into `order`(title,name,phone,score,deadline,lasting,gift,type,money,createtime,content,status) values(#{title},#{name},#{phone},#{score},#{deadline},#{lasting},#{gift},#{type},#{money},#{createtime},#{content},#{status})")
    void publish(PublishOrderVO publishOrderVO);

    @Select("select * from order where title=#{title}")
    Order findBytitle(String title);

    @Select("select * from order where id=#{id}")
    Order findById(int id);

    @Select("select * from order where name=#{name} or name2=#{name}")
    List<Order> findMyOrderList(String name);

    @Select("select * from order where name!=#{name} and name2!=#{name}")
    List<Order> findOrderList(String name);

    @Update("update order set name2=#{name2} and phone2=#{phone2} and score2=#{score2} and accepttime=#{accepttime} where id=#{id}")
    void accept(AcceptVO acceptVO);

    @Update("update order set finishtime=#{finishtime} where id=#{id}")
    void finish(FinishVO finishVO);

    @Delete("delete from order where id=#{id}")
    void cancel(int id);
}
