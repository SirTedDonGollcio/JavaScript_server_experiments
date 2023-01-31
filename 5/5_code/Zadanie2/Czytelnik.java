package Zadanie2;

import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicInteger; 

public class Czytelnik implements Runnable
{
	Vector<Integer> przeczytaneKsiazki;
	AtomicInteger gotoweKsiazki;
	Vector<Integer> lista;
	int B,ID,czytaneTeraz;
	boolean czyStaraKsiazka = true;
	private BlockingQueue<String> queue;
	public void run() 
	{
		while(przeczytaneKsiazki.size()<B+1)
		{
			czytaj();
		}
	}
	
	Czytelnik(AtomicInteger gotoweKsiazki, Vector<Integer> lista,int B,int ID,BlockingQueue<String> queue)
	{
		this.ID = ID;
		this.gotoweKsiazki = gotoweKsiazki;
		this.lista = lista;
		this.B = B;
		this.przeczytaneKsiazki = new Vector<Integer>(B);
		this.queue = queue;
	}
	
	public void czytaj()
	{
		sleeep();
		try 
		{
		czytaneTeraz = Integer.valueOf(queue.take());
		}
		catch(InterruptedException e)
		{
            e.printStackTrace();
        }
		System.out.println("...czytelnik #" + Thread.currentThread().getName() + " przeczytal ksiazke \"" + czytaneTeraz +"\"...");
		
			przeczytaneKsiazki.add(czytaneTeraz);
		
	}
	
	void sleeep() {
    	try {
    		Thread.sleep((long) (4000 + 3000 * Math.random()));
    	} catch (InterruptedException ie) {
    		ie.printStackTrace();
    	}
    }
}
