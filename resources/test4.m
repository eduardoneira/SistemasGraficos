clear all
close all

min_coords = [ -1.149899959564209, 
               -1.149899959564209, 
               0.00019999999494757503 ];
           
           
load('position_buffer.mat');

minx = min(position_buffer(:,1))
miny = min(position_buffer(:,2))
minz = min(position_buffer(:,3))