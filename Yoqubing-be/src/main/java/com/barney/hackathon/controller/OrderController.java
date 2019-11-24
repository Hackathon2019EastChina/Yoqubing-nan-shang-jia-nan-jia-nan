package com.barney.hackathon.controller;

import com.barney.hackathon.HackathonEastChinaApplication;
import com.barney.hackathon.constant.SimpleResponse;
import com.barney.hackathon.dao.OrderDao;
import com.barney.hackathon.entity.Account;
import com.barney.hackathon.entity.Order;
import com.barney.hackathon.form.AcceptForm;
import com.barney.hackathon.form.PublishOrderForm;
import com.barney.hackathon.vo.AcceptVO;
import com.barney.hackathon.vo.FinishVO;
import com.barney.hackathon.vo.IdVO;
import com.barney.hackathon.vo.PublishOrderVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    OrderDao orderDao;

    @RequestMapping("/publish")
    public SimpleResponse publish(@RequestBody PublishOrderForm publishOrderForm){
        try {
            String token= publishOrderForm.getToken();
            Account account = HackathonEastChinaApplication.findAccountByToken(token);
            orderDao.publish(new PublishOrderVO(
                    publishOrderForm.getTitle(),account.getName(),account.getPhone(),account.getScore(),
                    publishOrderForm.getDeadline(),publishOrderForm.getLasting(),publishOrderForm.getGift(),
                    publishOrderForm.getType(),publishOrderForm.getMoney(),System.currentTimeMillis(),
                    publishOrderForm.getContent(),0
            ));
            System.out.println("一个用户发布订单");
            int id=orderDao.findBytitle(publishOrderForm.getTitle()).getId();
            return new SimpleResponse(0,new IdVO(id));
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/accept")
    public SimpleResponse accept(@RequestBody AcceptForm acceptForm){
        try {
            String token=acceptForm.getToken();   // 接受者token
            Account account2=HackathonEastChinaApplication.findAccountByToken(token); //接受者账户

            Order order=orderDao.findById(acceptForm.getId());
            if(order!=null){
                orderDao.accept(new AcceptVO(acceptForm.getId(),account2.getName(),
                        account2.getPhone(),account2.getScore(),System.currentTimeMillis())
                );
                System.out.println("一个订单被接取");
                return new SimpleResponse(0);
            }
            else return new SimpleResponse(1);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/finish")
    public SimpleResponse finish(@RequestBody AcceptForm acceptForm){
        try {
            Order order=orderDao.findById(acceptForm.getId());
            if(order!=null){
                orderDao.finish(new FinishVO(acceptForm.getId(),System.currentTimeMillis()));
                return new SimpleResponse(0);
            }
            else return new SimpleResponse(1);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/cancel")
    public SimpleResponse cancel(@RequestBody AcceptForm acceptForm){
        try {
            Order order=orderDao.findById(acceptForm.getId());
            if(order!=null){
                orderDao.cancel(acceptForm.getId());
                return new SimpleResponse(0);
            }
            else return new SimpleResponse(1);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/getOrderById")
    public SimpleResponse getOrderById(@RequestBody AcceptForm acceptForm){
        try {
            Order order=orderDao.findById(acceptForm.getId());
            return new SimpleResponse(0,order);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/getMyOrderList")
    public SimpleResponse getMyOrderList(@RequestBody String token){
        try {
            String name=HackathonEastChinaApplication.findAccountByToken(token).getName();
            Map map=new HashMap<String, List>();
            map.put("orders",orderDao.findMyOrderList(name));  //TODO 没测试"or"能不能实现
            return new SimpleResponse(0,map);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }

    @RequestMapping("/getOrderList")
    public SimpleResponse getOrderList(@RequestBody String token){
        try {
            String name=HackathonEastChinaApplication.findAccountByToken(token).getName();
            Map map=new HashMap<String, List>();
            map.put("orders",orderDao.findOrderList(name));  //TODO 没测试"!="能不能实现
            return new SimpleResponse(0,map);
        }catch (Exception e){
            return new SimpleResponse(1,e);
        }
    }
}
