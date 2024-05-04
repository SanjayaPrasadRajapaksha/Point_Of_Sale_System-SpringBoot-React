package com.pointofsalesystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private String name;
    private double price;
    private double quantity;
    private long category_id; 
}
