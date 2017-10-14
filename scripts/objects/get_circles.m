clear all
close all

% Leo los primeros 10 puntos para probar

points = dlmread('points.txt', ',', [0 0 10 2]);

prev_vect = zeros(3,1);
curr_vect = zeros(3,1);

for i = 2:size(points, 1)
    
    curr = points(i,:);
    prev = points(i-1,:);
    
    prev_vect = curr_vect;
    curr_vect = curr - prev;
    
    
    
    if i == 2
        continue;
    end
    
    
    
%     display(sprintf('%i: hi', i));
        
end