package Zadanie2;

import java.util.concurrent.atomic.AtomicInteger;
import java.io.*; 
import java.util.*; 
import java.util.concurrent.BlockingQueue;

public class Pisarz implements Runnable
{
	AtomicInteger zarezerwowaneKsiazki,gotoweKsiazki;
	Vector<Integer> lista;
	int B;
	int ID;
	int terazPisze;
	private BlockingQueue<String> queue;
	
	public void run() 
	{
		while(zarezerwowaneKsiazki.get() < B)
		{
			pisz();		
		}
	}
	
	Pisarz(AtomicInteger zarezerwowaneKsiazki,AtomicInteger gotoweKsiazki, Vector<Integer> lista,int B,int ID,BlockingQueue<String> queue)
	{
		this.zarezerwowaneKsiazki = zarezerwowaneKsiazki;
		this.gotoweKsiazki = gotoweKsiazki;
		this.lista = lista;
		this.B = B;
		this.ID = ID;
		this.queue = queue;
	}
	
	public void pisz()
	{
		sleeep();
		if(zarezerwowaneKsiazki.get()<B)
		{
			
			System.out.println("...pisarz #" + Thread.currentThread().getName() + " zrobil ksiazke \"" + zarezerwowaneKsiazki.get() +"\"...");

			zarezerwowaneKsiazki.set(zarezerwowaneKsiazki.get() + 1);
			try {
			queue.put(String.valueOf(zarezerwowaneKsiazki.get()));
			}
			catch(InterruptedException e)
			{
	            e.printStackTrace();
	        }
		}
	}
	
	void sleeep() {
    	try {
    		Thread.sleep((long) (5000 + 2000 * Math.random()));
    	} catch (InterruptedException ie) {
    		ie.printStackTrace();
    	}
    }
}
