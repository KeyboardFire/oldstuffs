def g;rand(10).to_s;end;c=w=0;a='correct';b='wrong';loop{x=g;y=g;o=[?+,?-,?*].sample;print x+o+y+'=';if gets.chomp.to_i==eval(x+o+y);puts a+'!';c+=1;else puts b+'!';w+=1;end;puts"Score: #{c.to_s} #{a} | #{w.to_s} #{b}\n\n"}